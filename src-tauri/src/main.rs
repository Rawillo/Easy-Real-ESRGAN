// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use std::fs;
use std::path::{Path, PathBuf};
#[tauri::command]
fn read_dir(dir: &str, recursive: bool) -> Vec<PathBuf> {
    let mut result = Vec::new();
    let path = Path::new(dir);

    if path.is_dir() {
        if recursive {
            read_dir_recursive(path, &mut result);
        } else {
            if let Ok(entries) = fs::read_dir(path) {
                for entry in entries {
                    if let Ok(entry) = entry {
                        let abs_path = entry.path().canonicalize().unwrap();
                        result.push(abs_path);
                    }
                }
            }
        }
    }

    result
}
#[tauri::command]
fn is_dirs(path: &str) -> bool {
    let _path = Path::new(path);
    return _path.is_dir();
}

fn read_dir_recursive(dir: &Path, result: &mut Vec<PathBuf>) {
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                let path = entry.path();
                if path.is_dir() {
                    read_dir_recursive(&path, result);
                } else {
                    let abs_path = path.canonicalize().unwrap();
                    result.push(abs_path);
                }
            }
        }
    }
}




fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read_dir, is_dirs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
