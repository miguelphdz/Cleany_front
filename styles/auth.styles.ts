import { COLORS } from "@/constants/theme"
import { StyleSheet, Dimensions } from "react-native"

const {width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 10,
      },
      logo: {
        width: 270,
        height: 220,
        alignSelf: 'center',
        marginBottom: 20,
        marginRight:25
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'auto',
        color: COLORS.black,
      },
      subTitle: {
        fontSize: 18,
        textAlign: 'auto',
        marginLeft: 10,
        color: COLORS.black,
        marginBottom: 20,
      },
      rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      footerText: {
        color: COLORS.black,
      },
      footerLink: {
        color: COLORS.darkblue,
        fontWeight: 'bold',
      },
}) 