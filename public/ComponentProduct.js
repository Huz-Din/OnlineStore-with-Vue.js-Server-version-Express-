Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: '0.png',
        }
    },

   methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
    },
    template: `
        <div class="fetured_items_cards_flex">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});


Vue.component('product', {
    props: ['product', 'img'],
    template: `
    <div class="fetured_items_cards">        
        <img :src="product.img" alt="Some img" class="image_fetured">
        <div class="txt_fetured_items_card">
            <p class="name_fetured_items_card">{{product.product_name}}</p>
            <p class="price_fetured_items_card">{{product.price}} $</p>
        </div>
        <div class="box_button_fetured_items_card">
        <button class="button_fetured_items_card" @click="$parent.$parent.$refs.cart.addProduct(product)">
            <i class="fas fa-cart-arrow-down"></i>
            <p class="text_button_fetured_items_card">Add to Cart</p>
        </button>
        </div>  
    </div>
    `
})


// /* <img class="image_fetured" :src="img" alt="Some img"> */

