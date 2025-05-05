import { COLORS } from "@/constants/theme"
import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")

export  const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
      },
      header: {
        alignItems: 'center',
        marginBottom: 16,
      },
      avatar: {
        width: 100, height: 100, borderRadius: 50,
      },
      username: {
        fontSize: 20, fontWeight: 'bold', marginTop: 8,
      },
      stars: {
        flexDirection: 'row', marginTop: 4,
      },
      description: {
        fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8,
      },
    
      // Mensaje
      messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0EFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
      },
      messageInput: {
        flex: 1,
        fontSize: 14,
        color: '#000',
      },
      sendButton: {
        backgroundColor: '#5630D4',
        padding: 8,
        borderRadius: 8,
        marginLeft: 8,
      },
    
      // Reseñas
      reviewCard: {
        backgroundColor: '#F7F5FF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
      },
      reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      reviewAvatar: {
        width: 40, height: 40, borderRadius: 20,
      },
      reviewerName: {
        fontWeight: '600',
        fontSize: 14,
        marginLeft:4,
      },
      reviewStars: {
        flexDirection: 'row',
        marginTop: 4,
      },
      reviewText: {
        fontSize: 12,
        color: '#333',
      },
    
      // Experiencia
      experienceInput: {
        backgroundColor: '#F0EFFF',
        borderRadius: 12,
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 14,
        marginBottom: 12,
      },
      submitButton: {
        backgroundColor: '#5630D4',
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 32,
      },
      submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
      loadingContainer: {

      },
      reviewContent: {
        marginTop: 4,
        fontSize: 14,
        color: '#333',
        marginLeft:4,
      },
      reportButton: {
        position: 'absolute',
        top: 16,
        right: 16,
      },
    
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        maxHeight: '60%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        textAlign: 'center',
      },
      reasonItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: '#EEE',
        borderBottomWidth: 1,
      },
      reasonItemSelected: {
        backgroundColor: '#E3F2FD',
      },
      reasonText: {
        fontSize: 16,
      },
      reasonTextSelected: {
        color: '#1976D2',
        fontWeight: '600',
      },
      modalButton: {
        backgroundColor: '#E53935',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
      },
      modalButtonDisabled: {
        backgroundColor: '#F8BBD0',
      },
      modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },
      modalClose: {
        marginTop: 12,
        alignItems: 'center',
      },
      modalCloseText: {
        color: '#777',
        fontSize: 14,
      },
});