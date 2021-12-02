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
    data?: Array<string>; // RoutineModel
}
export class Account {
    // liked_post_id_list : Array<string>;
    // followed_id_list: Array<string>;
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
    link?: string;
}