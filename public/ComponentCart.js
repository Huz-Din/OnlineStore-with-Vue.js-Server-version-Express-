Vue.component('cart', {
    data(){
        return {
            imgCart: '0.png',
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
      },
      methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
          remove(item) {
              this.$parent.getJson(`${API}/deleteFromBasket.json`)
                  .then(data => {
                      if(data.result === 1) {
                          if(item.quantity>1){
                              item.quantity--;
                          } else {
                              this.cartItems.splice(this.cartItems.indexOf(item), 1)
                          }
                      }
                  })
          },
      },
      mounted(){
          this.$parent.getJson(`/api/cart`)
              .then(data => {
                  for(let el of data.contents){
                      this.$data.cartItems.push(el);
                  }
              });
      },
      template: `
  <div>
              <button class="button_My_account" type="button" @click="showCart = !showCart">Корзина</button>
              <div class="cart-block" v-show="showCart">
                  <p v-if="!cartItems.length">Cart is empty</p>
                  <cart-item class="cart-item" 
                  v-for="item of cartItems" 
                  :key="item.id_product"
                  :cart-item="item" 
                  :img="imgCart"
                  @remove="remove">
                  </cart-item>
              </div>
  </div>`
  });
  Vue.component('cart-item', {
      props: ['cartItem', 'img'],
      template: `
                  <div class="cart-item">
                      <div class="product-bio">
                          <img :src="img" alt="Some image">
                          <div class="product-desc">
                              <p class="product-title">{{cartItem.product_name}}</p>
                              <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                              <p class="product-single-price">$ {{cartItem.price}} each</p>
                          </div>
                      </div>
                      <div class="right-block">
                          <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                          <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                      </div>
                  </div>
      `
  });