export class Board {
    id!: string;
    name!: string;
    data!: Array<string>;
}
export class Posts {
    // post_id!: string;
    post_title!: string;
    user_id!: string;
    number_liked!: number;
    data!: Array<string>;
}
export class Accounts {
    user_id!: string;
    user_name!: string;
    liked_post_id_list : Array<string>;
    post_id_list!: Array<string>;
}



export class menuItemListModel {
    item_color!: string;
    icon_color!: string;
    icon_name!: string;
    label_color!: string;
    label_text!: string;
}