import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  logo: {
    height: 100,
    width: 100,
  },
  borderTransparent: {
    borderColor: 'transparent',
  },
  input: {
    marginTop:5,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingLeft: 30,
    fontFamily: 'Nunito-Regular'
  },
  emailContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    flex: 1,
    width: Dimensions.get('window').width-35,
  },
  colorGreen: {
    color: '#1fcf7c',
  },
  registrationButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 35,
     backgroundColor: '#fff',
     borderRadius: 5,
     padding: 15
  },
  registrationButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#1fcf7c'
  },
  colorWhite: {
    color: '#fff',
  },
  title: {
    fontFamily: 'Nunito-ExtraBold',
    color: '#fff',
    fontSize: 30
  },
  container: {
    paddingTop: 30,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').height - 25,
    flexDirection: 'column',
  },
  backgroundImageSize: {
    width: '100%',
    height: '100%',
  },
  icon: {
    fontSize: 100,
    color: "#fff"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
};
