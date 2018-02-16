<template>
  <div class="container" style="margin-top:10px;">
    <div class="blog">
      <div class="row">
        <div class="col">
          <div v-for="post in posts" class="row" style="padding-bottom:45px;">
            <div class="col">
              <div class="media">
                <img class="align-self-start mr-3" style="width: 10%" src="../assets/logo.png" alt="Generic placeholder image">
                <div class="media-body">
                  <h5 class="mt-0">{{ post.title }}</h5>
                  <p>{{ post.body }}<br /></p>
                  <br />
                  <div v-for="author in post.author">
                    <footer class="blockquote-footer text-right">Posted By <cite title="Source Title">{{ author.first_name }} {{ author.last_name }}</cite></footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button type="button"  style="margin-bottom:45px;" class="btn btn-dark"><router-link to="/blog/">Back to Blog</router-link></button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'Post',
  data () {
    return {
      msg: 'Welcome to Your Post Detail App',
      posts:{}
    }
  },
  created: function() {

    var url = 'http://localhost:3001/blog/post/'+this.$route.params.id;
      this.$http.get(url,{params:{}, headers: {'Authorization': 'Basic SjNKKz8hVXh7eV0ie2QyOlUqdUNlbTsvcmFXRzhieSY='}}).then(response => {
        // success callback
        console.log(response.body);
        this.posts=response.body;
      }, response => {
        // error callback
        console.log(this.id);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
