export class ProductModel {
    _id: string
    image: string;
    title: string;
    price: number;
    oldPrice: number;
    credit: number;
    calcRating: number;
    description: string;
    disAdvantages: string;
    categories: Array<string>;
    tags: string;
    characteristics: {
        [key: string]: string;
    };
}