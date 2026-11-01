export type TRestaurant = {
  _id: string
  name: string
  cover_images: string[]
  location: { coordinates: number[] }
  ratings: number
  description: string
  categories: any[]
  is_blocked: boolean
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}

export type TMenu = {
  _id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type TCategory = {
  _id: string
  name: string
  icon: string
}

export type TMenuItems = {
  _id: string;
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  category: TCategory;
  images: {
    key: string;
    url: string;
    _id: string;
  }[];
  stock: number;
  sales: number;
  size: string[];
  discount: number;
  color: string[];
  avgRating: number;
  brand: string;
  isDeleted: boolean;
  date: string;

  averageRating: number;
  reviews: any[];
  quantity?: number;
};

export type TMenuImage = {
  key: string;
  url: string;
  _id: string;
};


export type TJwtPayload = {
  email: string;
  role: "user" | "rider" | "admin" | "broker" | "vendor";
  _id: string;
  iat: number;
  exp: number;
}

export type TError = {
  data?: {
    message: string;
    stack?: string;
    statusCode: number;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  message?: string;
  statusCode?: number;
  success?: boolean;
  token?: string;
  meta?: TMeta;
};



export interface TSingleOrder {
  _id: string
  order_id: string
  payment_method: string
  total: number
  status: string
  payment_status: string
  items: TOrderProductItem[]
  billing_address: TBillingAddress
  shipping_address: TShippingAddress
  createdAt: string
}

export interface TOrderProductItem {
  product: TProduct
  store: string
  quantity: number
  discount: number
  _id: string
}

export type TProduct = {
  ratings: number
  _id: string
  name: string
  images: string[]
  category: TCategory
  store: string
  price: number
  description: string
  quantity: number
  discount: number
  is_deleted: boolean
  reviews: number
  avg_stars: number
  createdAt: string
  updatedAt: string
}

export interface TBillingAddress {
  _id: string
  user: string
  name: string
  email: string
  phone: string
  company_name: string
  street_address: string
  country: string
  state: string
  city: string
  zip_code: string
  house_no: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TShippingAddress {
  _id: string
  user: string
  name: string
  email: string
  phone: string
  company_name: string
  address: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface TCart {
  _id: string
  user: string
  product: TProduct
  quantity: number
  subtotal: number
  __v: number
}