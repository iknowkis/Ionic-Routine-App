export class Post {
    post_id?: string;
    post_title: string;
    post_content: string;
    writer_id: string;
    number_liked: number;
    number_archived: number;
    data?: Array<string>; // RoutineModel
    date?: any;
}
export class Account {
    // liked_post_id_list : Array<string>;
    // followed_id_list: Array<string>;
    id?: string;
    name: string;
    password: string;
}

export class menuItemListModel {
    icon_color: string;
    icon_name: string;
    label_color: string;
    label_text: string;
    link?: string;
}