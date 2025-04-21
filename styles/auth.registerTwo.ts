import { COLORS } from "@/constants/theme"
import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")

export  const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContainer: {
        backgroundColor: 'white',
        width: '80%',
        maxHeight: '70%',
        borderRadius: 10,
        padding: 16,
      },
      scrollContent: {
        paddingBottom: 20,
      },
      roleOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
      },
      imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
      },
      photoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: '#e4d4ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
      },
      photoText: {
        fontSize: 28,
      },
      uploadText: {
        fontSize: 13,
        color: '#333',
      },
      input: {
        flexDirection:'row',
        borderWidth: 2,
        borderColor: COLORS.ligthblue,
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
      },
      icon: {
        alignItems: 'center',
        marginRight:8
      },
      text:{
        color: "#999",
      },
      textArea: {
        height: 70,
        textAlignVertical: 'top',
      },
      button: {
        backgroundColor: '#2a00ff',
        paddingVertical: 12,
        borderRadius: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
});