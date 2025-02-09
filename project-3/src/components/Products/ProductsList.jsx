import React from 'react'
import {useSearchParams} from 'react-router-dom'
import './ProductsList.css'
import ProductCard from './ProductCard'
import useData from '../../hooks/useData'
import Pagination from '../Common/Pagination'

const ProductsList = () => {
    const [search, setSearch] = useSearchParams()
    const category = search.get("category")
const page = search.get("page")

    const {data, error} = useData("/products", {
        params: {
            category,
            page,
        }
    }, [category, page])

    const handlePageChange = page => {
        const currentParams = Object.fromEntries([...search])
        setSearch({...currentParams, page: page})
    }

  return (
    <section className="products_list_section">
        <header className="align_center products_list_header">
            <h2>Products</h2>
            <select name="sort" id="" className='products_sorting'>
                <option value="">Relevance</option>
                <option value="price desc">Price HIGH to LOW</option>
                <option value="price asc">Price LOW to HIGH</option>
                <option value="rate desc">Rate HIGH to LOW</option>
                <option value="rate asc">Rate LOW to HIGH</option>
            </select>
        </header>

        <div className="products_list">
            {error && <em className='form_error'>{error}</em>}
            {
                data?.products && data.products.map(product => <ProductCard key={product._id} product={product}/>)
            }
        </div>
        <>
        {data && <Pagination totalPosts={data?.totalProducts} postPerPage={8} onClick={handlePageChange} currentPage={page}/>}
        </>
    </section>
)
}

export default ProductsList