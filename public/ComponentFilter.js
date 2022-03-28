Vue.component('finder', {
    data () {
        return {
            userSearch: ''
        }
    },
   
    template: `
                <form action="#" class="form_header_left_top" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="input_search" v-model="userSearch">
                <button class="fas-fa-search" type="submit">
                <i class="fas fa-search"></i>
                </button>
                </form>
    `
 });
