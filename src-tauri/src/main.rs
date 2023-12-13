// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use sysinfo::{DiskExt, System, SystemExt};

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
        info_disks.push(DiskInfo {
            name: disk.name().to_str().unwrap_or("Unknown Disk").to_owned(),
            capacity: disk.total_space(),
            available_space: disk.available_space(),
        })
    }
    return info_disks;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_disk_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
