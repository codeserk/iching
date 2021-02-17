package es.codeserk.iching;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.capacitor.rateApp.CapacitorRateApp;

import java.util.ArrayList;
import com.equimaps.capacitorblobwriter.BlobWriter;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(BlobWriter.class);
      add(CapacitorRateApp.class);
    }});
  }
}
