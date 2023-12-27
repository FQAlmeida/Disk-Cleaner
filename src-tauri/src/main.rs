// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

use serde::{Deserialize, Serialize};
use sysinfo::{DiskExt, System, SystemExt};
use tauri::Manager;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct DiskInfo {
    name: String,
    capacity: u64,
    available_space: u64,
    mount_point: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
enum ElementType {
    File,
    Folder,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
struct ElementInfo {
    name: String,
    parent: String,
    element_type: ElementType,
    size: u64,
}

#[tauri::command]
fn get_disk_info() -> Vec<DiskInfo> {
    let mut sys = System::new_all();
    sys.refresh_disks();
    let mut info_disks: Vec<DiskInfo> = vec![];
    let filter_out_disks = ["none", "drvfs"];
    for disk in sys.disks() {
        if filter_out_disks.contains(&disk.name().to_str().unwrap_or("none")) {
            continue;
        }
        if info_disks
            .iter()
            .any(|info| info.name.eq(disk.name().to_str().unwrap_or("none")))
        {
            continue;
        }
        let disk_name = if cfg!(windows) {
            let disk_name = disk.name().to_str().unwrap_or("Unknown Disk").to_owned();
            let disk_mount = disk
                .mount_point()
                .to_str()
                .unwrap_or("Unknown Disk Mount Point")
                .to_owned();
            format!("{}{}", disk_mount, disk_name)
        } else {
            disk.name().to_str().unwrap_or("Unknown Disk").to_owned()
        };
        info_disks.push(DiskInfo {
            name: disk_name,
            capacity: disk.total_space(),
            available_space: disk.available_space(),
            mount_point: disk
                .mount_point()
                .to_str()
                .unwrap_or("Unknown Disk")
                .to_owned(),
        })
    }
    return info_disks;
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            let _id = app.listen_global("load_file_tree", move |event| {
                if let Some(data) = event.payload() {
                    dbg!(&data);
                    let disk = serde_json::from_str::<DiskInfo>(data).unwrap();
                    for element in fs::read_dir(disk.mount_point)
                        .unwrap()
                        .into_iter()
                        .filter_map(|e| e.ok())
                        .filter(|e| e.metadata().is_ok())
                    {
                        if let Ok(file_type) = element.file_type() {
                            let _ = handle.emit_all(
                                "load_file_tree_result",
                                ElementInfo {
                                    name: element.file_name().to_str().unwrap().to_owned(),
                                    parent: String::from("root"),
                                    size: element.metadata().unwrap().len(),
                                    element_type: if file_type.is_file() {
                                        ElementType::File
                                    } else {
                                        ElementType::Folder
                                    },
                                },
                            );
                        }
                        // dbg!(&element);
                    }
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_disk_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
