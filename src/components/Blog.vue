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
      <div v-for="post in posts" class="row" style="padding-bottom:45px;">
        <div class="col">
          <div class="media">
            <img class="align-self-start mr-3" style="width: 10%" src="../assets/logo.png" alt="Generic placeholder image">
            <div class="media-body">
              <h5 class="mt-0">{{ post.title }}</h5>
              <p>{{ post.body | truncate(100, '...')}}<router-link :to="`/blog/post/${post._id}`"> View More</router-link><br /></p>
              <button type="button" v-on:click="edit(post)" class="btn btn-outline-success">Edit Post</button>
              <br />
              <div v-for="author in post.author">
                <footer class="blockquote-footer text-right">Posted By <cite title="Source Title">{{ author.first_name }} {{ author.last_name }}</cite></footer>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button type="button" v-on:click="show" style="margin-bottom:45px;" class="btn btn-dark">Add a Post </button>
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
        author_id:"5a80dcfcc1ae923180a9e843"
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
    put:function(){
      this.$http.put('http://localhost:3001/blog',{
        _id:this.editpost._id,
        title:this.editpost.title,
        body:this.editpost.body,
        author_id:"5a80dcfcc1ae923180a9e843"
      },
      { headers:
        {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}
      }).then(function(res){
        this.$modal.hide('edit-post');
        this.$modal.show('has-posted');
        this.$http.get('http://localhost:3001/blog',{params:{}, headers: {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}}).then(response => {
          // success callback
          this.posts=response.body;
        }, response => {
          // error callback
          console.log(response);
        });
      });
    },
    post:function(){
      this.$http.post('http://localhost:3001/blog/',{
        title:this.blog.title,
        body:this.blog.body,
        author_id:"5a80dcfcc1ae923180a9e843"
      },
      { headers:
        {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}
      }).then(function(res){
        console.log(res.body);
        this.$modal.hide('new-post');
        this.$modal.show('has-posted');
        this.$http.get('http://localhost:3001/blog/',{params:{}, headers: {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}}).then(response => {
          // success callback
          this.posts=response.body;
        }, response => {
          // error callback
          console.log(response);
        });
      });
    }
    },
    created: function() {
        this.$http.get('http://localhost:3001/blog',{params:{}, headers: {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}}).then(response => {
          // success callback
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
