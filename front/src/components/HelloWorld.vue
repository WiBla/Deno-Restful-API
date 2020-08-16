<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row justify="center" align="start">
          <v-col cols="12">
            <v-list two-line subheader>
              <v-subheader>Books</v-subheader>

              <v-list-item v-for="book in books" :key="book.id">
                <v-list-item-content>
                  <v-list-item-title v-text="book.author"></v-list-item-title>
                  <v-list-item-subtitle v-text="book.title"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn color="error" @click="deleteBook(book.id)">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Create book</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form @submit.prevent="createBook()">
                  <v-text-field
                    label="Author"
                    name="author"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="newBook.author"
                    @keydown.enter="createBook"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Title"
                    name="title"
                    prepend-icon="mdi-tag"
                    type="text"
                    v-model="newBook.title"
                    @keydown.enter="createBook"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Pages"
                    name="pages"
                    prepend-icon="mdi-book-open-page-variant"
                    type="number"
                    min="0"
                    v-model="newBook.pages"
                    @keydown.enter="createBook"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="createBook">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newBook: {
        author: '',
        title: '',
        pages: 0,
      },
      books: [],
    };
  },
  props: {
    source: String,
  },
  methods: {
    getAllBooks() {
      axios.get('http://localhost:3000/books').then(({ data }) => {
        this.books = data;
      }).catch(console.error);
    },
    createBook() {
      axios.post('http://localhost:3000/books', this.newBook)
      .then(() => {
        this.getAllBooks();
        this.newBook = {author: '', title: '', pages: 0};
      })
      .catch(console.error);
    },
    deleteBook(id) {
      axios.delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        this.getAllBooks();
      })
      .catch(console.error);
    }
  },
  mounted() {
    this.getAllBooks();
  }
}
</script>