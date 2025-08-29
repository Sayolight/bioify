START = 
    👋 Привіт, <b>{ $name }</b>! Я бот Bioify, і допоможу тобі створити персональну вебсторінку для твого біо.
    
    ⚙️ Щоб створити новий профіль або обрати існуючий, введи команду /profiles.

PROFILE_LIST = Список твоїх профілів:
PROFILE_ITEMS = 
    ⚙️ Ти обрав профіль <b>{ $profile }</b>
    📎 { $webapp }
    
    <blockquote>📔 Доступні команди:</blockquote>
    • <code>/header [HEADER]</code> – додати заголовок до профілю
    • <code>/text [TEXT]</code> – додати текст до профілю
    • <code>/link [URL] [LABEL]</code> – додати гіперпосилання до профілю
    • <code>/rm [ELEMENT_ID]</code> – видалити елемент з профілю
    • <code>/mv [FIRST_ELEMENT_ID] [SECOND_ELEMENT_ID]</code> – поміняти місцями елементи профілю

    <blockquote>🗂 Елементи профілю:</blockquote>
    { $items }

PROFILE_CREATE_NAME = Введи назву профілю
PROFILE_CREATE_SUCCESS = Профіль створено!

ITEM_CREATE_SUCCESS = Створено елемент типу { $type }
ITEM_DELETE_SUCCESS = Елемент { $itemId } видалено

SWAP_ERROR = Не вдалося знайти один із елементів
SWAP_SUCCESS = Елементи { $firstItemId } та { $secondItemId } поміняно місцями

HEADER_ERROR = Неправильний формат команди. <code>/header [HEADER]</code>
TEXT_ERROR = Неправильний формат команди. <code>/text [TEXT]</code>
LINK_ERROR = Неправильний формат команди. <code>/link [URL] [LABEL]</code>
RM_ERROR = Елементу з таким ID не знайдено
MV_ERROR = Неправильний формат команди. <code>/mv <ITEM_ID1> <ITEM_ID2></code>
MV_NAN_ERROR = Аргументи мають бути числами
