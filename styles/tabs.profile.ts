import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 14,
  },
  reviewBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#F0EFFF',
    borderRadius: 8,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  reviewItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  reviewPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  reviewTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
  },
});

export const editStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  halfModalWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  modalContainer: {
    padding: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 20,
    backgroundColor: '#ddd',
    padding: 6,
    borderRadius: 20,
  },
  photoLabel: {
    marginTop: 8,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  row1: {
  
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
    

  },
  inputHalf: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#F0EFFF',
    paddingVertical: 10,   // solo padding arriba y abajo
    paddingHorizontal: 0,  // o el que necesites
    marginBottom: 12,
  },
  selectLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 6,
    
  },
  select: {
    borderWidth: 1,
    borderColor: '#F0EFFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
    padding: 8,
    backgroundColor: '#F0EFFF'
  },
  button: {
    backgroundColor: '#5637DD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
