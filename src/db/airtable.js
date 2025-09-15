import axios from 'axios';

const AIRTABLE_BASE_ID = 'appiDMzkMok4l51mj';
const AIRTABLE_API_KEY = 'patc2oC67C1GVAAFA.00080d2d431ca71dbecd850340098812e81dd0cb539a3ead6ac8c5b21a94db9a';
const USERS_TABLE = 'Users';
const REQUESTS_TABLE = "Requests"; 



const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  const response = await api.get(`/${USERS_TABLE}`);
  return response.data.records.map(record => ({
    id: record.id,
    ...record.fields,
  }));
};

export const fetchRequests = async () => {
  const response = await api.get(`/${REQUESTS_TABLE}`);
  return response.data.records.map(record => ({
    id: record.id,
    ...record.fields,
  }));
};

export const addRequest = async (data) => {

  const response = await api.post(`/${REQUESTS_TABLE}`, {
    records: [{ fields: data }],
  });
  return response.data.records[0];
};

export async function fetchLatestRequest() {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Requests?sort[0][field]=RID&sort[0][direction]=desc&maxRecords=1`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    }
  );

  const data = await res.json();
  return data.records[0]?.fields;
}

export async function fetchLatestUser(prefix) {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Users?filterByFormula=SEARCH("${prefix}", {UID})&sort[0][field]=UID&sort[0][direction]=desc&maxRecords=1`,
    {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
    }
  );

  const data = await res.json();
  return data.records?.[0]?.fields || null;
}


export const addUser = async (data) => {

  const response = await api.post(`/${USERS_TABLE}`, {
    records: [{ fields: data }],
  });
  return response.data.records[0];
};

export async function addreport(requestId, reportText, workerUID) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Requests/${requestId}`;
  
  const body = {
    fields: {
      report_text: reportText,
      report_by: workerUID,
      report_date: new Date().toLocaleDateString(),
    },
  };

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response.json();
}


export async function updateRequestStatus(recordId, newStatus) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Requests/${recordId}`;

  const response = await axios.patch(
    url,
    {
      fields: {
        status: newStatus,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
}

export async function AssignRequest(recordId, id) {
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Requests/${recordId}`;

  const response = await axios.patch(
    url,
    {
      fields: {
        assigned_to: id,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
}


export async function deleteRequest(recordId) {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Requests/${recordId}`;

    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    console.log("Deleted:", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(recordId) {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Users/${recordId}`;

    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    console.log("Deleted:", res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}


export const handleimageupload = async (image) => {

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "myproject");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dztutcwpy/image/upload",
      formData
    );
    console.log("Uploaded URL:", res.data.secure_url);
    return(res.data.secure_url);

  } catch (err) {
    console.error("Upload failed", err);
  }
};