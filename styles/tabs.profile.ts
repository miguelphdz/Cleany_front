import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  userTypeLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: '#EDD6CE',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 14,
    color: '#000',
  },
  reviewBox: {
    backgroundColor: '#EDD6CE',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  reviewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  reviewPhoto: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewName: {
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 13,
    color: '#333',
  },
});

// edición
export const editStyles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  uploadIcon: {
    marginTop: 8,
  },
  photoLabel: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectLabel: {
    marginTop: 16,
    marginBottom: 4,
  },
  select: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#5637DD',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
