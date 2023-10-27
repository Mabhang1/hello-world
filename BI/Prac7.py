def generate_k_shingles(document, k):
    shingles = set()
    document = document.lower()  # Convert the document to lowercase for case-insensitivity
    document = document.replace(' ', '')  # Remove spaces

    for i in range(len(document) - k + 1):
        shingle = document[i:i + k]
        shingles.add(shingle)

    return shingles

if __name__ == "__main__":
    # Example usage:
    document = "Creating k-shingles involves breaking a text into overlapping sequences of k consecutive characters or words"
    k = 4

    shingles = generate_k_shingles(document, k)

    print("~ By 4701-Abhang Mane")
    print("*****K-Shingles*****")
    print(f"{k}-shingles for the document:")
    for shingle in shingles:
        print(shingle)

