import React, {useState} from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import {useSelector, useDispatch} from "react-redux"
import { selectIsLoading } from '../../redux/features/product/productSlice'
import { createProduct } from '../../redux/features/product/productSlice'
import {useNavigate} from "react-router-dom"
import Loader from '../../components/loader/Loader'


const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
}


const AddProduct = () => {
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector(selectIsLoading);

    const { name, category, price, quantity} = product;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    };

    const generateSKU = () => {
        const letter = category.slice(0,3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    };


    const saveProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("name", name)
        formData.append("sku", generateSKU(category))
        formData.append("category", category)
        formData.append("quantity", quantity)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("image", productImage)

        console.log(...formData)

        await dispatch(createProduct(formData));

        navigate("/dashboard")
    };



  return (
    <div>
        <h3 className="--mt">Add New Product</h3>
        {isLoading && <Loader />}
        <ProductForm 
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        description={description}
        setDescription={setDescription}
        saveProduct={saveProduct}
        />
    </div>
  )
}

export default AddProduct