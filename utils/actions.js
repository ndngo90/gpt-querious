'use server';
import { revalidatePath } from 'next/cache';
import prisma from './db';
import Groq from 'groq-sdk';
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});
const regex =
  /[{\[]{1}([,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]|".*?")+[}\]]{1}/gis;

function jsonFromString(str) {
  const matches = str.match(regex);
  return Object.assign({}, ...matches.map((m) => JSON.parse(m)));
}
export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country
      }
    }
  });
};

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a ${city} in this ${country}.
  If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}.
  Once you have a list, create a one-day tour. Response must be in the following text format: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "description of the city and tour",
      "stops": [
        "stop name", 
        "stop name",
        "stop name"
      ]
    }
  }
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters. 
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'llama3-8b-8192'
    });
    // potentially returns a text with error message

    const total_tokens = response.usage.total_tokens;
    const tourData = response.choices[0]?.message?.content;
    const newData = jsonFromString(tourData);
    if (!newData.tour) {
      return null;
    }
    return {
      tour: newData.tour,
      tokens: total_tokens
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour
  });
};
export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc'
      }
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm
          }
        },
        {
          country: {
            contains: searchTerm
          }
        }
      ]
    },
    orderBy: {
      city: 'asc'
    }
  });
  return tours;
};

export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id
    }
  });
};

export const generateUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId
    }
  });
  return result?.tokens;
};
export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId
    }
  });
  return result?.tokens;
};
export const fetchOrGenerateToken = async (clerkId) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) {
    return result?.tokens;
  }
  return (await generateUserTokensForId(clerkId))?.tokens;
};
export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId
    },
    data: {
      tokens: {
        decrement: tokens
      }
    }
  });
  revalidatePath('/profile');
  return result?.tokens;
};
