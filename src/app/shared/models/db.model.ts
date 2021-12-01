export class Board {
    id!: string;
    name!: string;
    data!: Array<string>;
}
export class Post {
    post_title: string;
    post_content: string;
    writer_id: string;
    number_liked: number;
    number_archived: number;
    data?: Array<string>;
}
export class Account {
    // user_id!: string;
    // user_name!: string;
    // liked_post_id_list : Array<string>;
    // post_id_list!: Array<string>;
    id?: string;
    name!: string;
    password!: string;
}

export class menuItemListModel {
    item_color!: string;
    icon_color!: string;
    icon_name!: string;
    label_color!: string;
    label_text!: string;
}