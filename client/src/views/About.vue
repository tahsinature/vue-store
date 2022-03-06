<template>
  <div class="container mt-4 mb-5">
    <div class="header">
      <h1>About</h1>
    </div>
    <div class="gallery">
      <div>
        <img src="../assets/images/t4h51n_24327497_382315102197377_6000675444066615296_n.jpg" alt>
      </div>
      <div>
        <img src="../assets/images/GenArt.png" alt>
      </div>
      <div>
        <img src="../assets/images/home.jpg" alt>
      </div>
      <div>
        <img src="../assets/images/wavy.svg" alt>
      </div>
    </div>
    <div class="body">
      <p>It’s a bit strange naming this app as it is.
        <router-link to="/" class="link">‘Vue Store’</router-link>. Well, I decided to name it this way, there are two different reasons behind.
      </p>
      <ul class="reasons">
        <li>👉 Vue has been used on the client</li>
        <li>👉 And so that, people understand on the first touch what framework has been used.</li>
      </ul>
      <p>Yes, you might think, why Vue? Why not Node, Mongo or, something like that, as I used them also along with Vue in here. Well, to be precise, I preferred 'Vue Store' because it was the first time making something after learning Vue in 2019. Hi, I am
        <router-link to="/profile/5c5c0adf02479d0017a36ec2" class="link">Mohammad Tahsin</router-link>&nbsp;and I think this is the prefect time and point to tell what's this all about!
      </p>
      <div class="mt-4 feature-1">
        <p>
          'Vue Store' is a simple e-commerce like single page Node-Express application (SPA).
          <a
            href="https://en.wikipedia.org/wiki/Representational_state_transfer"
            target="_blank"
          >REST API</a> comes into the big picture when both client and server talk to each other. In this application you can:
        </p>
        <hr>
        <ul>
          <li>Post your advertisement of your product</li>
          <li>Buy product from other users</li>
          <li>Chat with users regarding to their products</li>
          <li>Add a user to your friend/contact list</li>
          <li>Add a review to a product</li>
          <li>Like a product</li>
          <li>Filter products based on your location</li>
          <li>Query products by category</li>
          <li>Add a product to your cart</li>
          <li>Save the cart and load it on the next login</li>
          <li>Update your profile</li>
          <li>Live notification based on user's activities regarding to your profile.</li>
          <li>Checkout and get a PDF invoice directly to your mail (Upcoming)</li>
          <li>Reset your password through a dynamic link to your email (Upcoming)</li>
        </ul>
      </div>
      <div class="mt-5">
        <p class="mb-2">Along with features I focused on authentication and authorization too.</p>
        <ul class="feature-2">
          <li>User cannot access certain page or, route without login.</li>
          <li>User can't post, like or review a product until you're logged in</li>
          <li>User can't manipulate other users post, reviews or even their profile.</li>
          <li>I took necessary steps both on client and on the server to verify user inputs with texts, scripts and files. So that a user can not perform cross site scripting attack and not send unnecessary inputs along with the requirement.</li>
          <li>And much much more if you really focus on in depth pin-point</li>
        </ul>
      </div>
      <div class="tech">
        <h4>Tech and Tools that has been used:</h4>
        <hr class="mb-5">
        <div class="my-cards">
          <div
            class="my-card"
            v-for="(tech, index) in techs"
            :key="index"
            :style="{transform: `rotate(${magicNumber[Math.floor(Math.random() * magicNumber.length + 1)]}deg)`}"
          >
            <h4>{{tech.title}}</h4>
            <p>{{tech.description}}</p>
          </div>
        </div>
      </div>
      <div class="conclusion">
        <h4>Conclusion</h4>
        <hr>
        <p>
          I tried to make it as a full featured demo application. Making it with only 6 months of experience I guess it's pretty obvious getting some bugs around. If you find so, just help me mentioning it on my
          <a
            href="https://github.com/tahsinature"
            target="_blank"
          >github</a>. I'll try my best to fix them in a proper way. Peace ✌.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      magicNumber: [3, 4, 5, 6, 7, -3, -4, -5, -6, -7],
      techs: [
        {
          title: 'Node.js',
          description:
            'Runtime environment for Javascript to run JavaScript outside of the browser.',
        },
        {
          title: 'Express.js',
          description:
            'Most popular framework for Node Applications designed for building web applications and APIs.',
        },
        {
          title: 'Vue.js',
          description:
            'One of the popular frameworks out there in 2019 for building UI. Other two players are Angular & React.',
        },
        {
          title: 'Vuex',
          description:
            'Vuex is a state management pattern + library for Vue.js applications for serving as a centralized store for all components..',
        },
        {
          title: 'Mongodb',
          description:
            'One of the popular databases and most popular database with Node Application.',
        },
        {
          title: 'Firebase',
          description:
            "I've used firebase to host Vue SPA. There were other options though like Amazon S3.",
        },
        {
          title: 'Socket.io',
          description:
            "I've used Socket.io to give the feeling of realtime push notification Service to the users & update contents live.",
        },
        {
          title: 'Bcrypt',
          description:
            'Bcrypt is a password hashing function based on the Blowfish block cipher cryptomatic algorithm and takes the form of an adaptive hash function.',
        },
        {
          title: 'JWT',
          description: 'Used JWT (JSON Web Token) to track user authentication.',
        },
        {
          title: 'Axios',
          description: "I've used Axios over Vue-Resource to send AJAX request.",
        },
        {
          title: 'Multer and Cloudinary',
          description:
            "To upload files to the server and I've used cloudinary to host images via CDN.",
        },
        {
          title: 'Sass',
          description:
            'CSS preprocessor. Sass is an extension of CSS3, adding nested rules, variables, mixins, selector inheritance, and more.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.container {
  color: #676464;
}
.link {
  cursor: pointer;
}
.header {
  background: #ffffff66;
  border: 5px solid #fff;
  margin: 1rem 0;
  padding: 1rem;
  color: #505050db;
  text-align: center;
  border-radius: 5px;
  font-family: "ZCOOL QingKe HuangYou", cursive;

  h1 {
    font-size: 34px;
    margin: 0;
  }
}
.gallery {
  // background: pink;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 100px 100px 100px 100px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 4rem;
  padding-top: 2rem;
  width: 400px;
  height: 35rem;
  @include respond(df, tab-p) {
    grid-template-rows: 50px 50px 50px 50px;
    width: 200px;
    margin-top: 3rem;
    // margin-bottom: 6rem;
    height: 20rem;
  }
  div {
    &:nth-of-type(1) {
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      z-index: 0;
      &:hover {
        z-index: 3;
      }
      img {
        width: 100%;
        height: 300%;
        object-fit: cover;
        filter: grayscale(100);
        &:hover {
          filter: grayscale(0);
        }
      }
    }
    &:nth-of-type(2) {
      grid-column: 2 / 4;
      grid-row-start: 2;
      z-index: 2;
      img {
        width: 100%;
        height: 300%;
        // object-fit: cover;
        filter: grayscale(100);
        &:hover {
          filter: grayscale(0);
        }
      }
    }
    &:nth-of-type(3) {
      grid-column: 3 / 5;
      grid-row-start: 3;
      z-index: 1;
      img {
        width: 100%;
        height: 300%;
        object-fit: cover;
        filter: grayscale(100);
        &:hover {
          filter: grayscale(0);
        }
      }
      &:hover {
        z-index: 3;
      }
    }
    &:nth-of-type(4) {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      top: 0;
      left: 0;
      z-index: 1;
      mix-blend-mode: exclusion;
      pointer-events: none;
      img {
        width: 100%;
        filter: grayscale(100);
        transform: translate(0, -25%);
        // height: 130%;
        // object-fit: cover;
      }
    }
  }
}
.body {
  margin-top: 3rem;
  @include respond(df, tab-p) {
    margin-top: 0;
  }
}
.reasons {
  list-style: none;
}
.feature-1 {
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    @include respond(df, tab-p) {
      grid-template-columns: 1fr 1fr;
    }
    @include respond(df, mbl) {
      grid-gap: 0.3rem;
      grid-template-columns: 1fr;
    }
    list-style: none;
    color: #5d2828;
    li {
      background: rgba(70, 70, 70, 0.13);
      padding: 0.5rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      border: 2px solid #fff;
      font-size: 0.9rem;
      @include respond(df, mbl) {
        border: 1px solid #fff;
      }
    }
  }
}
.feature-2 {
  // list-style: none;
  li {
    margin-left: 2rem;
    list-style: square;
  }
}
.tech {
  hr {
    margin-top: 0.5rem;
  }
  margin-top: 3rem;
  .my-cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    grid-row-gap: 4rem;
    @include respond(df, tab-l) {
      grid-template-columns: 1fr 1fr;
    }
    @include respond(df, tab-p) {
      grid-row-gap: 3rem;
      grid-template-columns: 1fr 1fr;
    }
    @include respond(df, mbl) {
      grid-template-columns: 1fr;
    }
  }
}
.my-card {
  position: relative;
  transition: all 1s;
  box-shadow: 1px 1px 80px 7px rgba(0, 0, 0, 0.05);
  @include respond(df, mbl) {
    transform: none !important;
  }
  // &:first-of-type {
  //   transform: rotate(5deg);
  // }
  // &:nth-of-type(2) {
  //   transform: rotate(-7deg);
  // }
  &::after {
    content: "";
    width: 50px;
    height: 20px;
    @include respond(df, mbl) {
      height: 25px;
    }
    background: rgba(255, 255, 255, 0.726);
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h4 {
    text-align: center;
    font-size: 1.2rem;
    color: #4e5252;
  }
  p {
    font-size: 0.8rem;
    color: #5b6565;
    font-family: "Handlee", cursive;

    text-align: center;
  }
  width: 200px;
  background: yellow;
  padding: 1rem;
  @include respond(df, mbl) {
    padding: 1.5rem 1rem;
    width: 300px;
  }
}
.conclusion {
  hr {
    margin-top: 0.5rem;
  }
  margin-top: 4rem;
}
</style>
