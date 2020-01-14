// import React, { Component } from 'react';
// import axios from 'axios';
// const API_URL = 'http://localhost:3000/articles';

// class ListArticle extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       articles: [],
//       token: '',
//       isFetching: false
//     }
//   }

//   render() {
//     const articles = this.state;

//     if (isFetching) {
//       const headerConfig = {
//         headers: { 'Authorization': token }
//       }

//       try {
//         const testCall = await axios.post(
//           API_URL, headerConfig
//         )
//           .then((response) => {
//             console.log(response.data)
//             alert('Articles fetched')
//           })
//       } catch (e) {
//         console.error(e)
//         alert('There has been an error while fetching the articles')
//       }
//     }

//     return (
//       <h1> TEST </h1>
//     )
//   }
// }

// export default ListArticle;
