START = 
    👋 Hi <b>{ $name }</b>! I'm Bioify bot, and I'll help you create a personalized webpage for your bio.
    
    ⚙️ To create a new profile or select an existing profile, enter the /profiles command.

PROFILE_LIST = Your profile list:
PROFILE_ITEMS = 
    ⚙️ You've chosen the <b>{ $profile }</b> profile
    📎 { $webapp }
    
    <blockquote>📔 Available commands:</blockquote>
    • <code>/header [HEADER]</code> - add a header to the profile
    • <code>/text [TEXT]</code> - add text to the profile
    • <code>/link [URL] [LABEL]</code> - add a hyperlink to the profile
    • <code>/rm [ELEMENT_ID]</code> - remove an item from the profile
    • <code>/mv [FIRST_ELEMENT_ID] [SECOND_ELEMENT_ID]</code> - swap profile items

    <blockquote>🗂 Profile elements:</blockquote>
    { $items }

PROFILE_CREATE_NAME = Enter the profile name
PROFILE_CREATE_SUCCESS = Profile created!

ITEM_CREATE_SUCCESS = Element of type { $type } created
ITEM_DELETE_SUCCESS = Element { $itemId } deleted

SWAP_ERROR = Couldn't find one of the elements
SWAP_SUCCESS = Elements { $firstItemId } and { $secondItemId } have been swapped

HEADER_ERROR = Invalid command format. <code>/header [HEADER]</code>
TEXT_ERROR = Invalid command format. <code>/text [TEXT]</code>
LINK_ERROR = Invalid command format. <code>/link [URL] [LABEL]</code>
RM_ERROR = No element with this ID found
MV_ERROR = Invalid command format. <code>/mv <ITEM_ID1> <ITEM_ID2></code>
MV_NAN_ERROR = Arguments must be numbers
