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
    # kill the underscores and lowercase
    formatted_color_name = color_name.replace('_', '').lower()

    # log
    print(f"Searching for: '{formatted_color_name}'")

    # find the color
    for color, hex_code in colors_dict.items():
        print(f"Checking color: '{color.replace('_', '').lower()}'")
        if color.replace('_', '').lower() == formatted_color_name:
            return hex_code

    return None

def main():
    json_file = 'colors.json' 
    colors_dict = load_colors(json_file)

    if colors_dict is None:
        print("Failed to load colors from JSON.")
        return

    # color to find
    color_name = input("Enter the color name: ")

    # get matching hex
    hex_value = find_hex_value(colors_dict, color_name)

    if hex_value:
        print(f"The hex value for '{color_name}' is: {hex_value}")
    else:
        print(f"Color '{color_name}' not found.")

if __name__ == "__main__":
    main()
