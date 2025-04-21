import { COLORS } from "@/constants/theme"
import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 25,
        paddingTop: 80,
      },
      headerContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      image: {
        width: 100,
        height: 100,
        marginBottom: 50,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
      },
      subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
      },
      form: {
        gap: 15,
        marginBottom: 30,
      },
      dropdown: {
        borderColor: '#B69DFF',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 12, 
        height: 50,
      },
      dropdownContainer: {
        borderColor: '#B69DFF',
        borderWidth: 1,
        borderRadius: 15,
      },
      dropdownText: {
        fontSize: 16,
        color: '#000',
      },
      placeholderStyle: {
        color: '#A0A0A0',
      },
  });
  
 