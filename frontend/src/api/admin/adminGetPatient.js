import API from '../axios';

export async function getAllPatient() {
  try {
    const response = await API.get('/admin/get-patient');
    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || 'Failed to fetch dashboard overview',
    };
  }
}
