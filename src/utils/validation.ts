// Validation utilities as required by the mockup

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates a Pokemon name
 * Requirements: At least 3 characters, no special characters
 */
export const validatePokemonName = (name: string): ValidationResult => {
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      error: 'Name is required'
    };
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 3) {
    return {
      isValid: false,
      error: 'Name must be at least 3 characters long'
    };
  }

  // Check for special characters (only letters, numbers, and hyphens allowed)
  const validNameRegex = /^[a-zA-Z0-9\-\s]+$/;
  if (!validNameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, numbers, hyphens, and spaces'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates search input
 */
export const validateSearchInput = (searchTerm: string): ValidationResult => {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return { isValid: true }; // Empty search is valid
  }

  const trimmedSearch = searchTerm.trim();

  if (trimmedSearch.length > 50) {
    return {
      isValid: false,
      error: 'Search term must be 50 characters or less'
    };
  }

  // Prevent injection attacks
  const dangerousChars = /<script|javascript:|on\w+=/i;
  if (dangerousChars.test(trimmedSearch)) {
    return {
      isValid: false,
      error: 'Search term contains invalid characters'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates Pokemon ID
 */
export const validatePokemonId = (id: number | string): ValidationResult => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

  if (isNaN(numericId)) {
    return {
      isValid: false,
      error: 'ID must be a valid number'
    };
  }

  if (numericId < 1) {
    return {
      isValid: false,
      error: 'ID must be greater than 0'
    };
  }

  if (numericId > 10000) {
    return {
      isValid: false,
      error: 'ID must be a reasonable number'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates Pokemon type
 */
export const validatePokemonType = (type: string): ValidationResult => {
  const validTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  if (!type || typeof type !== 'string') {
    return {
      isValid: false,
      error: 'Type is required'
    };
  }

  const lowerType = type.toLowerCase().trim();

  if (!validTypes.includes(lowerType)) {
    return {
      isValid: false,
      error: 'Invalid Pokemon type'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Validates Pokemon data structure
 */
export const validatePokemonData = (pokemon: unknown): ValidationResult => {
  if (!pokemon || typeof pokemon !== 'object') {
    return {
      isValid: false,
      error: 'Pokemon data must be an object'
    };
  }

  const pokemonData = pokemon as Record<string, unknown>;

  // Validate required fields
  const nameValidation = validatePokemonName(pokemonData.name as string);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  const idValidation = validatePokemonId(pokemonData.id as number);
  if (!idValidation.isValid) {
    return idValidation;
  }

  // Validate types array
  if (!Array.isArray(pokemonData.types) || pokemonData.types.length === 0) {
    return {
      isValid: false,
      error: 'Pokemon must have at least one type'
    };
  }

  // Validate each type
  for (const type of pokemonData.types) {
    const typeValidation = validatePokemonType(type as string);
    if (!typeValidation.isValid) {
      return typeValidation;
    }
  }

  return {
    isValid: true
  };
};