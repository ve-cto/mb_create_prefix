import json
from colour import Color

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

def generate_gradient(start_color, end_color, steps):
    start_color = Color(f"#{start_color}")
    end_color = Color(f"#{end_color}")
    gradient = list(start_color.range_to(end_color, steps))
    return [color.hex_l.lstrip('#') for color in gradient]

def main():
    # Load colors from JSON file
    json_file = 'colors.json'  
    colors_dict = load_colors(json_file)

    if colors_dict is None:
        print("Failed to load colors from JSON.")
        return

    username = str(input("What is the player's username? (For example... kenobi_luke): "))
    print("\n")
    text_to_colour = str(input("What rank is the player? (For example... Coach, Trial_Admin, and Mod): "))
    print("\n")

    def get_hex_color(input_prompt):
        color_name = str(input(input_prompt))
        hex_value = find_hex_value(colors_dict, color_name)
        if hex_value:
            return hex_value.lstrip('#')
        else:
            print(f"Color '{color_name}' not found. Using the input as a hex value directly.")
            return color_name.lstrip('#')

    colourA = get_hex_color("What is the desired starting colour? (For example... red, brightturquoise, 6fe37f): ")
    print("\n")

    colourB = get_hex_color("What is the desired ending colour?: ")
    print("\n")

    # Generate gradient for rank
    gradient_colors = generate_gradient(colourA, colourB, len(text_to_colour))

    # Assign each character in the rank a color from the gradient
    colored_rank = ''.join(f"&#{color}{char}" for color, char in zip(gradient_colors, text_to_colour))
    
    result_text = f"&7[{colored_rank}&7]&r"

    print("This is the resulting prefix. ")
    print(result_text)
    print("\n")
    print("And this is the command to change their prefix.")
    print(f"/lp user {username} meta setprefix {result_text}")
    print("\n")

if __name__ == "__main__":
    main()
