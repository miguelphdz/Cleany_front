import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
      paddingTop: 40,
      justifyContent: 'flex-start'
    },
    headerContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    logoutIcon:{
        marginBottom:14
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E5E7EB',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginBottom: 16,
    },
    searchInput: {
      color: 'black',
      fontSize: 16,
      width:200
    },
    locationWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      justifyContent: 'space-between', 
    },
    locationTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginRight: 8,
    },
    locationBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EDE9FE',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 4,
    },
    locationText: {
      color: '#5630D4',
      fontWeight: '600',
      marginRight: 4,
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 24,
    },
    photo: {
      width: 94,
      height: 94,
      borderRadius: 52,
      marginRight: 16,
    },
    cardContent: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    star: {
      marginRight: 4,
    },
    description: {
      fontSize: 12,
      backgroundColor: '#DDD6FE',
      padding: 8,
      borderRadius: 8,
      color: '#000',
    },
  });