<template>
  <div class="container mt-4 mb-5">
    <div class="header">
      <h1>{{mode === 'new' ? 'Post a New Ad' : 'Edit your Ad'}}</h1>
    </div>
    <hr>
    <flash-message></flash-message>
    <div class="form-group">
      <input
        type="text"
        placeholder="Title"
        class="form-control"
        v-model="newProduct.title"
        v-validate="{required: true, min: 5, max: 25}"
        name="title"
        :class="{'is-invalid': errors.has('title')}"
      >
      <small class="invalid-feedback">{{errors.first('title')}}</small>
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input
        type="number"
        class="form-control"
        aria-label="Amount (to the nearest dollar)"
        placeholder="Price"
        v-model.number="newProduct.price"
        name="price"
        v-validate="{required: true}"
        :class="{'is-invalid': errors.has('price')}"
      >
      <small class="invalid-feedback">{{errors.first('price')}}</small>
    </div>
    <div class="form-group">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Location</label>
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect01"
          v-model="newProduct.location"
          name="location"
          v-validate="'required'"
          :class="{'is-invalid': errors.has('location')}"
        >
          <option
            v-for="location in locations"
            :key="location.value"
            :value="location.value"
          >{{location.name}}</option>
        </select>
        <small class="invalid-feedback">{{errors.first('location')}}</small>
      </div>
    </div>
    <div class="form-group">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect02">Category</label>
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect02"
          v-model="newProduct.category"
          name="category"
          :class="{'is-invalid': errors.has('category')}"
          v-validate="'required'"
        >
          <option
            v-for="category in categories"
            :value="category.value"
            :key="category.value"
          >{{category.name}}</option>
        </select>
        <small class="invalid-feedback">{{errors.first('category')}}</small>
      </div>
    </div>
    <!-- -- -->
    <div class="form-group">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect03">Condition</label>
        </div>
        <select
          class="custom-select"
          id="inputGroupSelect03"
          name="condition"
          :class="{'is-invalid': errors.has('category')}"
          v-validate="'required'"
          v-model="newProduct.condition"
        >
          <option selected hidden disabled value="null">Select Condition of the product</option>
          <option value="used">Used</option>
          <option value="new">New</option>
        </select>
        <small class="invalid-feedback">{{errors.first('condition')}}</small>
      </div>
    </div>
    <!-- -- -->
    <div class="form-group">
      <textarea
        data-gramm_editor="false"
        id
        cols="30"
        rows="10"
        class="form-control"
        placeholder="Describe about this product here..."
        name="description"
        v-model="newProduct.description"
        v-validate="{required: true, max: 500}"
        :class="{'is-invalid': errors.has('description')}"
      ></textarea>
      <small class="invalid-feedback">{{errors.first('description')}}</small>
    </div>
    <div class="image-preview-box jumbotron mb-3" v-show="newProduct.images.length >= 1">
      <div>
        <app-single-image-preview
          v-for="(image, index) in newProduct.images"
          :key="index"
          :image="image.url"
          @onImageRemove="removeUploadedImage(index)"
        ></app-single-image-preview>
      </div>
    </div>
    <div class="progress mb-3" v-if="isUploading">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{width: uploadProgress+'%'}"
      ></div>
    </div>
    <div class="image-uploader-box mb-3">
      <div class="text-center">
        <div class="upload-wrapper">
          <image-uploader
            browseText="Click to browse"
            dragText="Drag an image"
            popupText="Cover photos appears at first and will be used as default image."
            primaryText="Cover"
            dropText="Drop here"
            markIsPrimaryText="Make Cover"
            :maxImage="5 - newProduct.images.length"
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            :key="1"
            ref="imageUploader"
            :class="{'image-uploader-error': imgWarning}"
          ></image-uploader>
          <button
            class="btn btn-block btn-success"
            @click="uploadMedia()"
            :disabled="this.selectedImages.length < 1
        || this.selectedImages.length > 5
        || this.newProduct.images.length >= 5"
          >
            Upload
            <i class="fas fa-upload"></i>
          </button>
          <small class="invalid-feedback d-inline" v-if="imgWarning">Image is required</small>
        </div>
      </div>
      <div
        class="tips-wrapper"
        :class="{
        'arrow_box-top': windowSize<= 576,
        'arrow_box-left': windowSize> 576, }
        "
      >
        <div>
          <h3>Use real photos!</h3>
          <p>Ads with real photos get 10 times more views than with catalogue images.</p>
          <img src="https://w.bikroy-st.com/dist/img/all/post/images-hint-4720b5e9.png" alt>
          <p>Images must be JPG or PNG format (max 5 MB). Do not upload images with watermarks.</p>
        </div>
      </div>
    </div>
    <button
      class="btn btn-primary btn-block"
      type="button"
      :disabled="checkMode || !isAllPropertyPresent"
      :class="{'btn-success': allDone}"
      @click="reviewPost()"
    >
      <span v-if="!allDone">{{mode === 'edit' ? 'Edit And Publish': 'Publish'}}</span>
      <span v-if="allDone">Validation Completed</span>
      <i class="fas fa-check-circle ml-2 valid-tick" v-show="allDone"></i>
      <span
        class="spinner-grow spinner-grow-sm"
        role="status"
        aria-hidden="true"
        v-if="checkMode && !allDone"
      ></span>
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import Vue from 'vue';
import imageUploader from 'vue-upload-multiple-image';
import ImageCompressor from 'image-compressor.js';
import SingleImagePreviewVue from '../components/SingleImagePreview.vue';
import { productController, mediaController } from '../api';

export default {
  components: {
    'image-uploader': imageUploader,
    'app-single-image-preview': SingleImagePreviewVue,
  },
  data() {
    return {
      newProduct: {
        title: '',
        price: undefined,
        location: null,
        category: null,
        condition: null,
        description: '',
        images: [],
      },
      locations: [
        { name: 'Select Location', value: null },
        { name: 'Asia', value: 'asia' },
        { name: 'Africa', value: 'africa' },
        { name: 'North America', value: 'north-america' },
        { name: 'South America', value: 'south-america' },
        { name: 'Antartica', value: 'antartica' },
        { name: 'Europe', value: 'europe' },
        { name: 'Australia', value: 'australia' },
      ],
      categories: [
        { name: 'Select Product Category', value: null },
        { name: 'Mobiles', value: 'mobile' },
        { name: 'Electronics', value: 'electronic' },
        { name: 'Vehicles', value: 'vehicle' },
        { name: 'Property', value: 'property' },
        { name: 'Jobs', value: 'job' },
        { name: 'Services', value: 'service' },
        { name: 'Home & Living', value: 'home-living' },
        { name: 'Fashion, Health & Beauty', value: 'fashion-health-beauty' },
        { name: 'Hobbies, Sports & Kids', value: 'hobby-sport-kid' },
        { name: 'Business & Industry', value: 'business' },
        { name: 'Education', value: 'education' },
        { name: 'Pets & Animals', value: 'pets' },
        { name: 'Food & Agriculture', value: 'food' },
      ],
      selectedImages: [],
      isImageBoxTouched: false,
      checkMode: false,
      allDone: false,
      windowSize: undefined,
      isUploading: false,
      uploadProgress: 0,
      mode: undefined,
      imgWarning: false,
      isAllPropertyPresent: false,
    };
  },
  methods: {
    uploadImageSuccess(formData, index, files) {
      this.isImageBoxTouched = true;
      const file = formData.getAll('file')[0];
      if (this.selectedImages.length < 5 - this.newProduct.images.length) {
        this.selectedImages.push(file);
      } else {
        this.$refs.imageUploader.images.pop(5 - this.selectedImages.length);
        this.flash('Maximum Image Limit: 5', 'error', {
          timeout: 3000,
          important: true,
        });
      }
    },
    beforeRemove(index, done, files) {
      this.selectedImages.splice(index, 1);
      done();
    },
    uploadSingletoFirebase(file) {
      const vm = this;
      // eslint-disable-next-line no-new
      new ImageCompressor(file, {
        quality: 0.3,
        success(compressedFile) {
          // eslint-disable-next-line no-use-before-define
          uploadToFirebase(compressedFile);
        },
        error(e) {
          console.log(e);
        },
      });
      function uploadToFirebase(compressedFile) {
        const uploadTask = firebase
          .storage()
          .ref(
            `products-${
              vm.newProduct.title ? vm.newProduct.title : 'UnkownProduct'
            }-${Date.now(compressedFile.name)}`,
          )
          .put(compressedFile);
        uploadTask.then((response) => {
          response.ref.getDownloadURL().then((url) => {
            vm.isUploading = false;
            vm.uploadProgress = 0;
            const newImg = {};
            newImg.url = url;
            vm.newProduct.images.push(newImg);
          });
        });
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          vm.isUploading = true;
          // eslint-disable-next-line no-multi-spaces
          vm.uploadProgress =            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        });
      }
    },
    uploadMedia() {
      if (
        this.selectedImages.length < 1
        || this.selectedImages.length > 5
        || this.newProduct.images.length >= 5
      ) {
        return;
      }
      this.selectedImages.forEach((x) => {
        this.uploadSingletoFirebase(x);
      });
      this.selectedImages = [];
      this.$refs.imageUploader.images = [];
    },
    removeUploadedImage(index) {
      this.newProduct.images.splice(index, 1);
    },
    reviewPost() {
      this.isImageBoxTouched = true;
      this.checkMode = true;
      // setTimeout(() => {
      this.$validator.validateAll().then((success) => {
        if (success) {
          this.allDone = true;
          if (this.mode === 'new') {
            productController
              .newProduct(this.newProduct)
              .then((resp) => {
                this.$store.dispatch('addNewProduct', resp.data);
                this.$emit('onNewPost');
                this.$router.push(`/products/${resp.data._id}`);
                this.$destroy();
              })
              .catch((err) => {
                window.location.reload('/');
                // this.$router.push('/');
                // console.log(err.response);
                // this.checkMode = false;
                // this.allDone = false;
              });
          } else {
            productController
              .editProduct(this.$route.params.id, this.newProduct)
              .then((resp) => {
                this.$store.dispatch('setSelectedProduct', resp.data);
                this.$emit('onPostEdit', resp.data.title);
                this.$router.push(`/products/${resp.data._id}`);
              })
              .catch(err => console.log(err));
          }
        } else {
          this.checkMode = false;
        }
      });
      // }, 1000);
    },
  },
  watch: {
    selectedImages() {
      this.selectedImages.length < 1
      && this.newProduct.images.length < 1
      && this.isImageBoxTouched
        ? (this.imgWarning = true)
        : (this.imgWarning = false);
    },
    newProduct: {
      deep: true,
      handler() {
        if (
          this.newProduct.images.length > 0
          && this.newProduct.title
          && this.newProduct.price
          && this.newProduct.location
          && this.newProduct.category
          && this.newProduct.condition
          && this.newProduct.description
        ) {
          this.isAllPropertyPresent = true;
        } else this.isAllPropertyPresent = false;
      },
    },
    // eslint-disable-next-line func-names
    'newProduct.images': function () {
      if (this.newProduct.images.length > 0) this.imgWarning = false;
    },
    isUploading() {
      if (this.isUploading) this.imgWarning = false;
    },
  },
  created() {
    this.windowSize = document.documentElement.clientWidth;
    window.addEventListener('resize', () => {
      this.windowSize = document.documentElement.clientWidth;
    });
  },
  beforeMount() {
    this.mode = this.$route.fullPath.split('/').pop();
    if (this.mode === 'edit') {
      const product = this.$store.getters.getSelectedProduct;
      if (!product || product._id != this.$route.params.id) {
        this.$router.push('404');
      } else {
        this.newProduct.title = product.title;
        this.newProduct.price = product.price;
        this.newProduct.location = product.location;
        this.newProduct.description = product.description;
        this.newProduct.images = product.images;
        this.newProduct.category = product.category;
        this.newProduct.condition = product.condition;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main.scss";
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
.image-preview-box {
  text-align: center;
  padding: 1rem;
  & > div {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    display: inline-block;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.image-uploader-box {
  display: grid;
  // grid-template-columns: min-content 1fr;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  @include respond(df, mbl) {
    grid-template-columns: 1fr;
  }
  @include respond(mf, tab-l) {
    justify-self: end;
    margin-right: 1rem;
  }
  grid-gap: 2rem;
  .upload-wrapper {
    display: inline-block;
    button {
      margin-top: 0.5rem;
      // color: rgba(114, 114, 114, 0.76);
      // background: #adb48f2b;
      // transition: all 0.3s;
      // &:hover {
      //   color: rgb(255, 255, 255);
      //   background: #999999;
      // }
    }
  }
  .tips-wrapper {
    background: red;
    border-radius: 10px;
    padding: 1rem;
    color: #673500;
    background: #fbf6d5;
    border: solid 2px #dcb300;
    width: 100%;
    @include respond(mf, tab-l) {
      width: 70%;
      justify-self: start;
    }
    @include respond(df, tab-p) {
      h2 {
        font-size: 1.2rem;
      }
      p {
        font-size: 0.8rem;
        text-align: center;
      }
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        margin: 1rem 0;
      }
    }
  }
}
.arrow_box-top {
  position: relative;
  border: 2px solid #dcb300;
}
.arrow_box-top:after,
.arrow_box-top:before {
  bottom: 100%;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box-top:after {
  border-color: rgba(251, 246, 213, 0);
  border-bottom-color: #fbf6d5;
  border-width: 10px;
  margin-left: -10px;
}
.arrow_box-top:before {
  border-color: rgba(220, 179, 0, 0);
  border-bottom-color: #dcb300;
  border-width: 13px;
  margin-left: -13px;
}

.arrow_box-left {
  position: relative;
  background: #fbf6d5;
  border: 2px solid #dcb300;
}
.arrow_box-left:after,
.arrow_box-left:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box-left:after {
  border-color: rgba(251, 246, 213, 0);
  border-right-color: #fbf6d5;
  border-width: 10px;
  margin-top: -10px;
}
.arrow_box-left:before {
  border-color: rgba(220, 179, 0, 0);
  border-right-color: #dcb300;
  border-width: 13px;
  margin-top: -13px;
}
.image-uploader-error {
  border: 2px solid rgba(255, 0, 0, 0.692);
  border-radius: 5px;
}
</style>
