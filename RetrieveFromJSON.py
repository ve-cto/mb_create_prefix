import json

def load_colors(json_file):
    try:
        with open(json_file, 'r') as file:
            content = file.read()
            print(f"File content: {content}")  # Print the file content
            colors_dict = json.loads(content)
        return colors_dict
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None
    except FileNotFoundError as e:
        print(f"File not found: {e}")
        return None

def find_hex_value(colors_dict, color_name):
    if colors_dict is None:
        return None
    # Remove underscores and convert to lowercase
    formatted_color_name = color_name.replace('_', '').lower()

    # Print the formatted color name
    print(f"Searching for: '{formatted_color_name}'")

    # Search for the hex value
    for color, hex_code in colors_dict.items():
        # Print each color being checked
        print(f"Checking color: '{color.replace('_', '').lower()}'")
        if color.replace('_', '').lower() == formatted_color_name:
            return hex_code

    return None

def main():
    json_file = 'colors.json'  # Replace with your .json file path
    colors_dict = load_colors(json_file)

    if colors_dict is None:
        print("Failed to load colors from JSON.")
        return

    # Input color name
    color_name = input("Enter the color name: ")

    # Find the corresponding hex value
    hex_value = find_hex_value(colors_dict, color_name)

    if hex_value:
        print(f"The hex value for '{color_name}' is: {hex_value}")
    else:
        print(f"Color '{color_name}' not found.")

if __name__ == "__main__":
    main()
