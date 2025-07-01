#!/bin/bash

# This script calculates the duration of .ogg files in milliseconds
# and outputs a CSV, replacing the .ogg extension with .wav in the output.

# Check if the required command 'soxi' is available.
if ! command -v soxi &> /dev/null
then
    echo "The 'soxi' command could not be found."
    echo "Please install the 'sox' package to proceed."
    exit 1
fi

# Output the CSV header.
echo "filename,length_ms"

# Loop through all files ending with .ogg in the current directory.
for file in *.ogg
do
    # Check if the file exists and is a regular file.
    if [ -f "$file" ]; then
        # Get the duration in seconds using soxi.
        duration_seconds=$(soxi -D "$file")

        # Check if soxi returned a valid duration.
        if [ -n "$duration_seconds" ]; then
            # Convert the duration to milliseconds.
            duration_ms=$(echo "$duration_seconds * 1000" | bc | cut -d. -f1)
            
            # Output the filename with .wav extension and the duration in ms.
            echo "\"${file%.ogg}.wav\",$duration_ms"
        else
            # Print an error message to standard error if duration could not be determined.
            echo "Could not determine duration for \"$file\"" >&2
        fi
    fi
done
