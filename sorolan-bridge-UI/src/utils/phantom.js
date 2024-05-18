export async function phantomProvider() {
    const getProvider = () => {
      if ('phantom' in window) {
        const provider = window.phantom?.solana;

        if (provider?.isPhantom) {
          return provider;
        }
      }

      window.open('https://phantom.app/', '_blank');
      return null;
    };

    const provider = getProvider();
    console.log('🚀 ~ phantomProvider ~ provider', provider)

    if (provider) {
      try {
        const resp = await provider.connect();
        console.log(resp.publicKey.toString());
        // setPhantomAddr(resp.publicKey.toString());
        return provider;
      } catch (err) {
        console.error(err);
        return false
      }
    } else {
      console.error('Phantom wallet not found.');
    return false
    }
  }