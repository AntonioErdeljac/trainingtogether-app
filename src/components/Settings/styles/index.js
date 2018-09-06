import { Dimensions } from 'react-native';

export default {
  input: {
    marginTop:5,
    marginBottom: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingLeft: 30,
    fontFamily: 'Nunito-Regular',
    borderColor: 'rgba(0,0,0,.4)',
    borderWidth: 0.1,
  },

  borderLess: {
    borderColor: 'transparent',
  },

  submitButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 35,
    backgroundColor: '#1fcf7c',
    borderRadius: 5,
    padding: 15,
  },

  submitButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Nunito-SemiBold',
    color: '#fff'
  },
}