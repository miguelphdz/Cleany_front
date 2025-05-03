import { COLORS } from "@/constants/theme"
import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")

export  const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingBottom: 60,
      },
      topLabel: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        fontSize: 12,
        color: '#aaa',
      },
      headerIcon: {
        width: 50,
        height: 50,
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderColor: '#5637DD',
        transform: [{ rotate: '45deg' }],
        marginTop: 20,
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
      },
      profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginBottom: 10,
      },
      name: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
      },
      starsContainer: {
        flexDirection: 'row',
        marginBottom: 12,
      },
      locationBox: {
        flexDirection: 'row',
        backgroundColor: '#e8d7da',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
      },
      locationText: {
        fontSize: 14,
        color: '#5637DD',
      },
      userTypeLabel: {
        fontSize: 14,
        marginBottom: 6,
      },
      userTypeBox: {
        backgroundColor: '#d5c1d6',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
      },
      userTypeText: {
        fontSize: 14,
        color: '#333',
      },
});