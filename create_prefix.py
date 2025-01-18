import math

# print("colourA?")
result_text = ""
bracket_colour = '{#light_gray}'

username = str(input("What is the players username? (For example... kenobi_luke): "))
print("\n")
text_to_colour = str(input("What rank is the player? (For example... Coach, Trial_Admin, and Mod): "))
print("\n")


colourA = str(input("What is the desired starting colour? (For example... red, brightturquoise, 6fe37f): "))
colourA = str("{#") + colourA + str(">}")
print("\n")

colourB = str(input("What is the desired ending colour?: "))
colourB = str("{#") + colourB + str("<}")
print("\n")

has_transition = str(input("Does the player want a transition colour? (yes/no)"))
print("\n")

if has_transition == "yes":
    colourC = input("What is the desired transition colour?: ")
    print("\n")
    colourC = str("{#") + colourC + str("<>}")
    colours = [colourA, colourC, colourB]
    has_transition = True
    
else:
    colours = [colourA, colourB]
    has_transition = False





if has_transition == False: 
    result_text += f"{bracket_colour}[{colourA}{text_to_colour}{colourB}{bracket_colour}]§r" 

elif has_transition == True:
    split1, split2 = text_to_colour[:len(text_to_colour)//2 + len(text_to_colour)%2], text_to_colour[len(text_to_colour)//2 + len(text_to_colour)%2:]
                                                          
    result_text += f"{bracket_colour}[{colourA}{split1}{colourC}{split2}{colourB}{bracket_colour}]§r"


print("This is the resulting prefix. ")
print(result_text)
print("\n")
print("And this is the command to change their prefix.")
print(f"/lp user {username} meta setprefix {result_text}")
print("\n")