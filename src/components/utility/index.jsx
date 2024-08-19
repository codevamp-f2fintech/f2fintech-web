/* eslint-disable no-case-declarations */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { displayToast } from "../../redux/actions/ToastAction";

export const Utility = () => {
  /** Formats an image name by appending a random number and removing special characters.
   * @param {string} name - The original image name.
   * @returns {string} - The formatted image name.
   */
  const formatName = (name) => {
    const formattedName = name
      .toLowerCase()
      .trim()
      .replace(/[!@#$%^&*();:'"`~`'$]/g, "")
      .replace(/\s+/g, "_");
    return formattedName;
  };

  /** Gets the value associated with a key from local storage.
   * @param {string} key - The key for which to retrieve the value from local storage.
   * @returns {any|null} - The value associated with the key, or null if the key is not found.
   */
  const getLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    if (
      typeof storedValue !== "undefined" &&
      storedValue !== null &&
      storedValue !== "undefined"
    ) {
      return JSON.parse(storedValue);
    }
    return null;
  };

  /** Removes a key-value pair from local storage.
   * @param {string} key - The key to be removed from local storage.
   * @returns {void} - This function does not return any value.
   */
  const remLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing ${key} from localStorage:`, err);
    }
  };

  /** Sets a key-value pair in the local storage.
   * @param {string} key - The key to be set in local storage.
   * @param {any} value - The value associated with the key.
   * @returns {void} - This function does not return any value.
   */
  const setLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(`Error setting ${key} in localStorage:`, err);
    }
  };

  /** Displays a toast alert, sets its severity and message, and navigates to a specified path (optional) after a delay.
   * @param {function} dispatch - The Redux dispatch function.
   * @param {boolean} display - Whether to display the toast alert.
   * @param {string} severity - The severity level of the toast alert (e.g., 'success', 'info', 'warning', 'error').
   * @param {string} msg - The message to be displayed in the toast alert.
   * @param {function} navigateTo - The navigation function to be called after the delay.
   * @param {string|null} path - The optional path to navigate to after hiding the toast alert.
   * @returns {void} - This function does not return any value.
   */
  const toastAndNavigate = (
    dispatch,
    display,
    severity,
    msg,
    navigateTo = () => {},
    path = null,
    reload = false,
    callback = () => {}
  ) => {
    console.log("showTost1");
    dispatch(
      displayToast({
        toastAlert: display,
        toastSeverity: severity,
        toastMessage: msg,
      })
    );

    setTimeout(() => {
      dispatch(
        displayToast({
          toastAlert: !display,
          toastSeverity: "",
          toastMessage: "",
        })
      );
      callback();
      console.log("showTost");
      if (path) {
        navigateTo(path);
        if (reload) {
          location.reload();
        }
      }
    }, 2000);
  };

  return {
    formatName,
    getLocalStorage,
    remLocalStorage,
    setLocalStorage,
    toastAndNavigate,
  };
};
