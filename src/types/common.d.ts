declare namespace CommonType {
    namespace Menu {
        type MenuOption = {
            key: String;
            label: String;
            value: String;
            children?: MenuOption;            
        } & MenuMixedOption;
    }
}