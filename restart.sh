#!/bin/bash

# Define paths as variables
ZIG_COLLECTOR_DIR="/data/utilities/zig-zag/zig-collector"
BUILD_OUTPUT_DIR="dist"  # Assuming this is the build output directory

# Redirect script output to a log file
script_name=$(basename "$0")
logfile="$script_name.log"
exec &> >(tee -a "$logfile")

# 1. Run git pull with error handling
echo "Running git pull..."
git pull
if [[ $? -ne 0 ]]; then
  echo "git pull failed! Script exiting."
  exit 1
fi

# 2. Run 'bun run build' with echo
echo "Running bun run build..."
bun run build

# 3. Copy 'dist' folder with echo, error handling, and cleanup
echo "Copying '$BUILD_OUTPUT_DIR' folder..."
rm -rf "$ZIG_COLLECTOR_DIR/src/$BUILD_OUTPUT_DIR"  # Remove existing directory (if any)
if ! cp -r "$BUILD_OUTPUT_DIR" "$ZIG_COLLECTOR_DIR/src/"; then  # Check copy success
  echo "Error copying '$BUILD_OUTPUT_DIR'! Script exiting."
  exit 1
fi

# 4. Change directory with echo
echo "Changing directory to $ZIG_COLLECTOR_DIR..."
cd "$ZIG_COLLECTOR_DIR"

# 5. Execute zig build with echo
echo "Building with zig..."
zig build

# 6. Execute systemctl restart with echo and error handling
if [[ $? -eq 0 ]]; then
  echo "Zig build successful. Restarting service..."
  systemctl restart zig-collector  # Replace with the specific service name
else
  echo "zig build failed. Service restart not executed."
fi
