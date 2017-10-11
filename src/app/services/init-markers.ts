export class Init {
    load() {
        if (localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined) {
            console.log('No markers found .... creating.... ');

            var markers = [
                {
                    name: 'Company One',
                    lat: 31.554606099999994,
                    lng: 74.000000,
                    draggable: true
                },
                {
                    name: 'Company two',
                    lat: 31.554606099999994,
                    lng: 74.3333333,
                    draggable: true
                },
                {
                    name: 'Purelogics',
                    lat: 31.554606099999994,
                    lng: 74.3571581,
                    draggable: false
                }
            ];
            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
            console.log('loading markers .....');
        }
    }
}