import Swal from "sweetalert2";

const urlBase = "http://localhost:9191/session"
const SessionService = {
  getAllSessions: async () => {
    const res = await fetch(urlBase + '/allSessions');
    if (!res.ok) {
      errorAlert("Server error, unable to get list of sessions")
      return
    }
    const data = await res.json();
    return data;
  },

  addNewSession: async (newSessionName) => {
    const res = await fetch(urlBase + '/new/' + newSessionName);
    if (!res.ok) {
      toastError("Server error, unable to create new session")
      return
    }
    const data = await res.json();

    return data;
  },

  getCurrentSession: async () => {
    const res = await fetch(urlBase + '/currentSession');
    if (!res.ok) {
      toastError("Server error, unable to access current session")
      return
    }
    const data = await res.json();
    return data;
  }
}

const errorAlert = (errorMessage) => {
  Swal.fire(
    'Cancelled',
    errorMessage,
    'error'
  )
}

const toastError = (errorMessage) => {
  Swal.fire({
    toast: true,
    icon: 'error',
    title: errorMessage,
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
}


export default SessionService;
