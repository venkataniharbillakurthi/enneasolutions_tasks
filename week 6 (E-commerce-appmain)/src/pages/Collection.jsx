import React, { useEffect, useState } from "react";
import { Checkbox, Select } from "antd";
import styled from "styled-components";
import { fetchProducts } from "../api";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import dropdown_icon from '../assets/dropdown_icon.png';
import SearchBar from '../components/SearchBar'; // Import SearchBar component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 40px;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const FilterSection = styled.div`
  min-width: 240px;
`;

const FilterHeader = styled.p`
  margin: 8px 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const FilterIcon = styled.img`
  height: 12px;
  @media (min-width: 640px) {
    display: none;
  }
  transform: ${(props) => (props.$showFilter ? "rotate(90deg)" : "none")};
`;

const FilterBox = styled.div`
  border: 1px solid #d9d9d9;
  padding: 12px 20px;
  margin-top: 24px;
  display: ${(props) => (props.$showFilter ? "block" : "none")};

  @media (min-width: 640px) {
    display: block;
  }
`;

const FilterTitle = styled.p`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 500;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductsContainer = styled.div`
  flex: 1;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  row-gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [Category, setCategory] = useState([]);
  const [SubCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilterProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter if exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (Category.length > 0) {
      filtered = filtered.filter(product => {
        const productName = product.name.toLowerCase();
        return Category.some(cat => {
          const category = cat.toLowerCase();
          if (category === 'kids') {
            return productName.includes('kids') || 
                   productName.includes('boys') || 
                   productName.includes('girls') ||
                   productName.includes('children');
          }
          return productName.startsWith(category);
        });
      });
    }

    // Apply type (subcategory) filter
    if (SubCategory.length > 0) {
      filtered = filtered.filter(product => {
        // Get the type from the product name
        const productName = product.name.toLowerCase();
        return SubCategory.some(type => {
          const typeKey = type.toLowerCase();
          if (typeKey === 'topwear') {
            return productName.includes('t-shirt') || 
                   productName.includes('shirt') || 
                   productName.includes('top');
          }
          if (typeKey === 'bottomwear') {
            return productName.includes('pant') || 
                   productName.includes('trouser') || 
                   productName.includes('jeans');
          }
          if (typeKey === 'winterwear') {
            return productName.includes('jacket') || 
                   productName.includes('sweater') || 
                   productName.includes('hoodie');
          }
          return false;
        });
      });
    }

    // Apply sorting
    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [products, Category, SubCategory, sortType, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      }
      return [...prev, value];
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Container>
        <FilterSection>
          <FilterHeader onClick={() => setShowFilter(!showFilter)}>
            FILTERS
            <FilterIcon
              $showFilter={showFilter}
              src={dropdown_icon}
              alt=""
            />
          </FilterHeader>

          <FilterBox $showFilter={showFilter}>
            <FilterTitle>CATEGORIES</FilterTitle>
            <CheckboxGroup>
              <Checkbox onChange={toggleCategory} value="Men">
                Men
              </Checkbox>
              <Checkbox onChange={toggleCategory} value="Women">
                Women
              </Checkbox>
              <Checkbox onChange={toggleCategory} value="Kids">
                Kids
              </Checkbox>
            </CheckboxGroup>
          </FilterBox>

          <FilterBox $showFilter={showFilter}>
            <FilterTitle>TYPE</FilterTitle>
            <CheckboxGroup>
              <Checkbox onChange={toggleSubCategory} value="Topwear">
                Topwear
              </Checkbox>
              <Checkbox onChange={toggleSubCategory} value="Bottomwear">
                Bottomwear
              </Checkbox>
              <Checkbox onChange={toggleSubCategory} value="Winterwear">
                Winterwear
              </Checkbox>
            </CheckboxGroup>
          </FilterBox>
        </FilterSection>

        <ProductsContainer>
          <HeaderSection>
            <Title text1="ALL" text2="COLLECTIONS" />
            <Select
              defaultValue="relavent"
              onChange={(value) => setSortType(value)}
              style={{ width: 200 }}
              options={[
                { value: "relavent", label: "Sort by: Relavent" },
                { value: "low-high", label: "Sort by: Low to High" },
                { value: "high-low", label: "Sort by: High to Low" },
              ]}
            />
          </HeaderSection>

          <ProductGrid>
            {filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </ProductGrid>
        </ProductsContainer>
      </Container>
    </div>
  );
};

export default Collection;
