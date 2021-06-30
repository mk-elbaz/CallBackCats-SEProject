export default {
  createSchedule: (user) => {
    console.log(user);
    return fetch("/user/createSchedule", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
  },
  viewSchedule: () => {
    return fetch("/user/viewSchedule")
      .then((res) => res.json())
      .then((data) => data);
  },
  enroll: (user) => {
    console.log(user);
    return fetch("/user/enroll", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => data);
  },
  
};
