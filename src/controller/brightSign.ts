export const getBrightSignConfig = () => {
  return ((dispatch: any): any => {

    return fetch('/GetBrightWallConfiguration')

    // return fetch('/GetIsBrightWall')

      .then(response => response.json())
      .then(data => {
        console.log('response to GetBrightWallConfiguration');
        console.log(data);
      });

    // .then(response => {
    //   const reader = (response.body as any).getReader();
    //   // return reader.read().then(({ done: any, value: any }) => {
    //   return reader.read().then((streamObject: any) => {
    //     console.log(streamObject.done);
    //     console.log(streamObject.value);
    //   });
    // });

  });
};



// .then(response => response.body)
// .then((body) => {
//   const reader = (body as any).getReader();
// }
// return fetch('http://192.168.86.235:8080/GetID', {
//   method: 'GET',
//   mode: 'no-cors',
// }).then((response) => {

// .then((response) => {
//     console.log(response);
//     console.log(response.text());
//   });

// return fetch('http://192.168.86.235:8080/GetID', {
//   // method: 'GET',
//   mode: 'no-cors',
//   // }).then((response) => {
// }).then(response => response.text())
//   .then((xmlString) => {
//     console.log('xmlString');
//     console.log(xmlString);
//   });
// .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
// .then(data => console.log(data))
// console.log('response from GetUserVars');
// console.log(response);
// });
// };
