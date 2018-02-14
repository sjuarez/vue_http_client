<template>
  <div class="container" style="margin-top:10px;">
    <div class="blog">
      <div class="row">
        <div class="col text-center">
          <nav class="navbar navbar-light bg-light justify-content-between">
            <a class="navbar-brand"></a>
            <form class="form-inline">
              <input class="form-control mr-sm-2" v-model="search" type="text" placeholder="Search Blog title.." aria-label="Search title..">
            </form>
          </nav>
        </div>
    </div>
      <div v-for="post in posts" class="row">
        <div class="col">
          <div class="media">
            <img class="align-self-start mr-3" style="width: 10%" src="../assets/logo.png" alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0">{{ post.title }}</h5>
              <p>{{ post.body }}</p>
              <a href="#" v-on:click="edit(post)" class="badge badge-success">Edit</a>
              <br />
              <div v-for="author in post.author">
                <p class="font-italic text-right">{{ author.first_name }} {{ author.last_name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button type="button" v-on:click="show" class="btn btn-dark">Add a Post </button>
        </div>
      </div>
    </div>
    <modal name="new-post">
      <div class="row">
        <div class="col" style="padding:50px;">
            <div class="form-group">
              <label for="formGroupExampleInput">Title</label>
              <input v-model="blog.title" type="text" class="form-control" id="formGroupExampleInput" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Body</label>
              <textarea v-model="blog.body"  class="form-control" rows="2" id="comment"></textarea>
            </div>
        <div class="col text-center" style="margin-bottom:50px;">
          <button type="button" v-on:click="hide" class="btn btn-dark">Cancel</button>
          <button type="button" v-on:click="post"  class="btn btn-success">Add a Post</button>
        </div>
        </div>
      </div>
    </modal>
    <modal name="has-posted">
      <div class="row">
        <div class="col text-center">
            THANKS FOR POSTING!
            <br />
            <button type="button" v-on:click="hidethnx" class="btn btn-dark">Close</button>
        </div>
      </div>
    </modal>
    <modal name="edit-post">
      <div class="row">
        <div class="col" style="padding:50px;">
            <div class="form-group">
              <label for="formGroupExampleInput">Title</label>
              <input v-model="editpost.title" type="text" class="form-control" id="formGroupExampleInput" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="formGroupExampleInput2">Body</label>
              <textarea v-model="editpost.body"  class="form-control" rows="2" id="comment"></textarea>
            </div>
        <div class="col text-center">
          <button type="button" v-on:click="hideEdit" class="btn btn-dark">Cancel</button>
          <button type="button" v-on:click="put"  class="btn btn-success">Edit Post</button>
        </div>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'Blog',
  data () {
    return {
      blog:{
        title:"",
        body:"",
        author_id:""
      },
      editpost:{
        title:"",
        body:"",
        author_id:""
      },
      posted:false,
      search: '',
      posts:{}
    }
  },
  methods: {
    show () {
      this.$modal.show('new-post');
    },
    hideEdit () {
      this.$modal.hide('edit-post');
    },
    edit (onepost) {
      console.log(onepost);
      this.editpost = onepost;
      this.$modal.show('edit-post');
    },
    hide () {
      this.$modal.hide('new-post');
    },
    hidethnx () {
      this.$modal.hide('has-posted');
    },
    post:function(){
      this.$http.post('http://localhost:3001/blog',{
        title:this.blog.title,
        body:this.blog.body,
        author_id:"5a80dcfcc1ae923180a9e843"
      }).then(function(res){
        console.log(res.body);
        this.$modal.hide('new-post');
        this.$modal.show('has-posted');
        this.$http.get('http://localhost:3001/blog').then(response => {
          // success callback
          //console.log(response.body);
          this.posts=response.body;
        }, response => {
          // error callback
          console.log(this.id);
        });
      });
    }
    },
    created: function() {
        this.$http.get('http://localhost:3001/blog').then(response => {
          // success callback
          //console.log(response.body);
          this.posts=response.body;
        }, response => {
          // error callback
          console.log(this.id);
        });
    },
    computed: {
      filteredList() {
          return this.posts.filter(post => {
          return post.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
}//
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
