/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/ComponentCart.js":
/*!*********************************!*\
  !*** ./public/ComponentCart.js ***!
  \*********************************/
/***/ (() => {

eval("Vue.component('cart', {\r\n    data(){\r\n        return {\r\n            imgCart: '0.png',\r\n            cartUrl: '/getBasket.json',\r\n            cartItems: [],\r\n            showCart: false,\r\n        }\r\n      },\r\n      methods: {\r\n        addProduct(item){\r\n            let find = this.cartItems.find(el => el.id_product === item.id_product);\r\n            if(find){\r\n                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})\r\n                    .then(data => {\r\n                        if(data.result === 1){\r\n                            find.quantity++\r\n                        }\r\n                    })\r\n            } else {\r\n                const prod = Object.assign({quantity: 1}, item);\r\n                this.$parent.postJson(`/api/cart`, prod)\r\n                    .then(data => {\r\n                        if(data.result === 1){\r\n                            this.cartItems.push(prod)\r\n                        }\r\n                    })\r\n            }\r\n        },\r\n          remove(item) {\r\n              this.$parent.getJson(`${API}/deleteFromBasket.json`)\r\n                  .then(data => {\r\n                      if(data.result === 1) {\r\n                          if(item.quantity>1){\r\n                              item.quantity--;\r\n                          } else {\r\n                              this.cartItems.splice(this.cartItems.indexOf(item), 1)\r\n                          }\r\n                      }\r\n                  })\r\n          },\r\n      },\r\n      mounted(){\r\n          this.$parent.getJson(`/api/cart`)\r\n              .then(data => {\r\n                  for(let el of data.contents){\r\n                      this.$data.cartItems.push(el);\r\n                  }\r\n              });\r\n      },\r\n      template: `\r\n  <div>\r\n              <button class=\"button_My_account\" type=\"button\" @click=\"showCart = !showCart\">Корзина</button>\r\n              <div class=\"cart-block\" v-show=\"showCart\">\r\n                  <p v-if=\"!cartItems.length\">Cart is empty</p>\r\n                  <cart-item class=\"cart-item\" \r\n                  v-for=\"item of cartItems\" \r\n                  :key=\"item.id_product\"\r\n                  :cart-item=\"item\" \r\n                  :img=\"imgCart\"\r\n                  @remove=\"remove\">\r\n                  </cart-item>\r\n              </div>\r\n  </div>`\r\n  });\r\n  Vue.component('cart-item', {\r\n      props: ['cartItem', 'img'],\r\n      template: `\r\n                  <div class=\"cart-item\">\r\n                      <div class=\"product-bio\">\r\n                          <img :src=\"img\" alt=\"Some image\">\r\n                          <div class=\"product-desc\">\r\n                              <p class=\"product-title\">{{cartItem.product_name}}</p>\r\n                              <p class=\"product-quantity\">Quantity: {{cartItem.quantity}}</p>\r\n                              <p class=\"product-single-price\">$ {{cartItem.price}} each</p>\r\n                          </div>\r\n                      </div>\r\n                      <div class=\"right-block\">\r\n                          <p class=\"product-price\">{{cartItem.quantity*cartItem.price}}</p>\r\n                          <button class=\"del-btn\" @click=\"$emit('remove', cartItem)\">&times;</button>\r\n                      </div>\r\n                  </div>\r\n      `\r\n  });\n\n//# sourceURL=webpack://project_express/./public/ComponentCart.js?");

/***/ }),

/***/ "./public/ComponentFilter.js":
/*!***********************************!*\
  !*** ./public/ComponentFilter.js ***!
  \***********************************/
/***/ (() => {

eval("Vue.component('finder', {\r\n    data () {\r\n        return {\r\n            userSearch: ''\r\n        }\r\n    },\r\n   \r\n    template: `\r\n                <form action=\"#\" class=\"form_header_left_top\" @submit.prevent=\"$parent.$refs.products.filter(userSearch)\">\r\n                <input type=\"text\" class=\"input_search\" v-model=\"userSearch\">\r\n                <button class=\"fas-fa-search\" type=\"submit\">\r\n                <i class=\"fas fa-search\"></i>\r\n                </button>\r\n                </form>\r\n    `\r\n });\r\n\n\n//# sourceURL=webpack://project_express/./public/ComponentFilter.js?");

/***/ }),

/***/ "./public/ComponentProduct.js":
/*!************************************!*\
  !*** ./public/ComponentProduct.js ***!
  \************************************/
/***/ (() => {

eval("Vue.component('products', {\r\n    data(){\r\n        return {\r\n            catalogUrl: '/catalogData.json',\r\n            products: [],\r\n            filtered: [],\r\n            imgCatalog: '0.png',\r\n        }\r\n    },\r\n\r\n   methods: {\r\n        filter(userSearch){\r\n            let regexp = new RegExp(userSearch, 'i');\r\n            this.filtered = this.products.filter(el => regexp.test(el.product_name));\r\n        }\r\n    },\r\n    mounted(){\r\n        this.$parent.getJson(`/api/products`)\r\n            .then(data => {\r\n                for(let el of data){\r\n                    this.$data.products.push(el);\r\n                    this.$data.filtered.push(el);\r\n                }\r\n            });\r\n    },\r\n    template: `\r\n        <div class=\"fetured_items_cards_flex\">\r\n            <product v-for=\"item of filtered\" :key=\"item.id_product\" :img=\"imgCatalog\" :product=\"item\"></product>\r\n        </div>\r\n    `\r\n});\r\n\r\n\r\nVue.component('product', {\r\n    props: ['product', 'img'],\r\n    template: `\r\n    <div class=\"fetured_items_cards\">        \r\n        <img :src=\"product.img\" alt=\"Some img\" class=\"image_fetured\">\r\n        <div class=\"txt_fetured_items_card\">\r\n            <p class=\"name_fetured_items_card\">{{product.product_name}}</p>\r\n            <p class=\"price_fetured_items_card\">{{product.price}} $</p>\r\n        </div>\r\n        <div class=\"box_button_fetured_items_card\">\r\n        <button class=\"button_fetured_items_card\" @click=\"$parent.$parent.$refs.cart.addProduct(product)\">\r\n            <i class=\"fas fa-cart-arrow-down\"></i>\r\n            <p class=\"text_button_fetured_items_card\">Add to Cart</p>\r\n        </button>\r\n        </div>  \r\n    </div>\r\n    `\r\n})\r\n\r\n\r\n// /* <img class=\"image_fetured\" :src=\"img\" alt=\"Some img\"> */\r\n\r\n\n\n//# sourceURL=webpack://project_express/./public/ComponentProduct.js?");

/***/ }),

/***/ "./public/Script.js":
/*!**************************!*\
  !*** ./public/Script.js ***!
  \**************************/
/***/ (() => {

eval("const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\r\n\r\nconst app = new Vue ({\r\n    el: '#app',\r\n    data: {\r\n        userSearch: '',\r\n    },\r\n    methods: {\r\n    getJson(url){\r\n        return fetch(url)\r\n            .then(result => result.json())\r\n            .catch(error => {\r\n                // console.log(error)\r\n                this.$refs.error.text = error;\r\n            })\r\n        },\r\n\r\n        postJson(url, data){\r\n            return fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n        putJson(url, data){\r\n            return fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n\r\n    },\r\n\r\n    mounted(){\r\n\r\n\r\n    }\r\n   \r\n});\r\n\r\nconst app2 = new Vue ({\r\n    el: '#app2',\r\n    data: {\r\n        userSearch: '',\r\n    },\r\n    methods: {\r\n    getJson(url){\r\n        return fetch(url)\r\n            .then(result => result.json())\r\n            .catch(error => {\r\n                // console.log(error)\r\n                this.$refs.error.text = error;\r\n            })\r\n        },\r\n\r\n        postJson(url, data){\r\n            return fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n        putJson(url, data){\r\n            return fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n\r\n    },\r\n\r\n    mounted(){\r\n\r\n\r\n    }\r\n   \r\n});\r\n\r\nconst app3 = new Vue ({\r\n    el: '#app3',\r\n    data: {\r\n        userSearch: '',\r\n    },\r\n    methods: {\r\n    getJson(url){\r\n        return fetch(url)\r\n            .then(result => result.json())\r\n            .catch(error => {\r\n                // console.log(error)\r\n                this.$refs.error.text = error;\r\n            })\r\n        },\r\n\r\n        postJson(url, data){\r\n            return fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n        putJson(url, data){\r\n            return fetch(url, {\r\n                method: 'PUT',\r\n                headers: {\r\n                    \"Content-Type\": \"application/json\"\r\n                },\r\n                body: JSON.stringify(data)\r\n            })\r\n                .then(result => result.json())\r\n                .catch(error => {\r\n                    // console.log(error)\r\n                    this.$refs.error.text = error;\r\n                })\r\n        },\r\n\r\n    },\r\n\r\n    mounted(){\r\n\r\n\r\n    }\r\n   \r\n});\r\n\r\n\n\n//# sourceURL=webpack://project_express/./public/Script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./public/Script.js"]();
/******/ 	__webpack_modules__["./public/ComponentCart.js"]();
/******/ 	__webpack_modules__["./public/ComponentFilter.js"]();
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/ComponentProduct.js"]();
/******/ 	
/******/ })()
;